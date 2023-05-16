// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
    auth: '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'
  })
  
  await octokit.request('GET /repos/{owner}/{repo}/commits', {
    owner: 'AidarGatin',
    repo: 'GitHub-Action-Tester',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })