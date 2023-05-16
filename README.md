# Get Recent Commit Authors GitHub Action
GitHub Action to list repository recent commits authors emails"
### Description:
The "GitHub Recent Commits Authors" action is designed to retrieve the recent commit authors of a GitHub repository. It provides a convenient way to fetch the email addresses of the authors who have made commits within a specified time frame. This action can be used to analyze the contributors' activity and gather insights about the development progress of a project.

### Usage Example:

```
name: Get Recent Commit Authors
on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  get-commits:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2

      - name: Get Recent Commit Authors
        uses: AidarGatin/github-recent-commits-authors@v1.0
        id: recent-commits
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }} # default ''
          days-before: '7' # default 30
          output-format: 'raw' # default 'raw' supports only raw for now

      - name: Print Authors' Emails
        run: |
          echo "Authors' Emails: ${{ steps.recent-commits.outputs.emails }}"
```
In the above example, the workflow is triggered whenever a push occurs on the main branch. It contains a job named `get-commits` that runs on the latest version of Ubuntu. The steps of the job include checking out the repository using the `actions/checkout` action and retrieving the recent commit authors using the GitHub action.
The action requires a `GitHub token`, which can be provided as a secret `GITHUB_TOKEN`. The `time-frame` input specifies the duration for which the recent commits are considered, and the `output-format` input determines the format of the output.

Finally, the workflow prints the emails of the commit authors by accessing the output of the GitHub action using the `${{ steps.recent-commits.outputs.emails }}`.
