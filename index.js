const core = require('@actions/core');
const request = require("sync-request");

function fetchCommits(githubRepository, start_date, githubToken) {
  const response = request("GET", `https://api.github.com/repos/${githubRepository}/commits?since=${start_date}`, {
    headers: {
      authorization: `token ${githubToken}`,
      "User-Agent": "MyApp",
    },
  });

  if (response.statusCode !== 200) {
    throw new Error(`Error fetching commits. Status code: ${response.statusCode}`);
  }

  return JSON.parse(response.getBody("utf8"));
}

try {
  //inputs defined in action metadata file
  const githubRepository = core.getInput('github_repository');
  const githubToken = core.getInput('github_token');
  const daysBefore = core.getInput('days_before');
  const outputFormat = core.getInput('output_format');

  console.log(`[*] Getting ${githubRepository} as GitHub repository`);
  console.log(`[*] Getting ${githubToken} as GitHub token`);
  console.log(`[*] Getting ${daysBefore} as Days before`);
  console.log(`[*] Getting ${outputFormat} as Output Format`);

  //Calculate the date 30 days ago from today
  const today = new Date();
  today.setDate(today.getDate() - daysBefore);
  const start_date = today.toISOString().split('T')[0];
  console.log(`[*] Getting ${start_date} as Start Date`);

  let commitsAPIData = null;
  // Attempt to fetch the commits from the GitHub API
  try {
    commitsAPIData = fetchCommits(githubRepository, start_date, githubToken);
  } catch (error) {
    console.log("[!] " + error.message);
  }

  // Extract email list as a list in to authorEmails if the commitsAPIData API request  was accessed successfully
  let authorEmails = null;
  if (commitsAPIData != null) {
    authorEmails = commitsAPIData.map((commit) => commit.commit.author.email);
  }
  if (authorEmails == null) {
    console.log(`No commits found for ${githubRepository}\'s GitHub repository`)
  }
  else {
    console.log(`[*] Found emails: ${authorEmails}`)
    core.setOutput("emails", authorEmails);
  }
} catch (error) {
  core.setFailed(error.message);
}

