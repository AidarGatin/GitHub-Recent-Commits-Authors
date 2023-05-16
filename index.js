const { Octokit } = require("@octokit/core");
const core = require('@actions/core');

try {
  //inputs defined in action metadata file
  const githubRepository = core.getInput('github-repository');
  const githubToken = core.getInput('github-token');
  const daysBefore = core.getInput('days-before');
  const outputFormat = core.getInput('output-format');

  console.log(`[*] Getting ${githubRepository}\'s GitHub repository`);
  console.log(`[*] Getting ${githubToken}\'s GitHub token`);
  console.log(`[*] Getting ${daysBefore}\'s Days before`);
  console.log(`[*] Getting ${outputFormat}\'s Output Format`);

  //Calculate the date 30 days ago from today
  const today = new Date();
  const start_date = new Date(today);
  start_date.setDate(start_date.getDate() - daysBefore);
  console.log(`[*] Getting ${start_date}\'s Start Date`);

  //attempt to use auth token to get email via accessing the user's API page
  let usersAPIData = null;
  try {   

    const octokit = new Octokit({
      auth: `${githubToken}`
    });

    usersAPIData = octokit.request(`GET /repos/${owner_repo}/commits?since=${start_date}`, {
      owner_repo: githubRepository,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

  } catch (error) {
    console.log("[!] " + error.message);
  }

  // Extract email list as a list in to userEmails if the usersAPIData API request  was accessed successfully
  let userEmails = null;
  if (usersAPIData != null) {
    userEmails = usersAPIData.data.map((commit) => commit.commit.author.email);
  }
  if (userEmails == null) {
    console.log(`No commits found for ${githubRepository}\'s GitHub repository`)
  }
  else {
    console.log(`[*] Found ${userEmails}\'s emails: ${userEmails}`)
    core.setOutput("emails", userEmails);
  }
} catch (error) {
  core.setFailed(error.message);
}

