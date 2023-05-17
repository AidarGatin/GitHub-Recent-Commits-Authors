# Get Recent Commit Authors GitHub Action
GitHub Action to list repository recent commits all or unique authors emails"

### Description:
The "GitHub Recent Commits Authors" action is designed to retrieve the recent commit all or unique authors of a GitHub repository. It provides a convenient way to fetch the email addresses of the authors who have made commits within a specified time frame. This action can be used to analyze the contributors' activity and gather insights about the development progress of a project.

### Implementation and Parameters
```
      - name: Get Recent Commit Authors
        uses: AidarGatin/github-recent-commits-authors@v1.4
        id: recent-commits-authors
        with:
          github_repository: OWNER/REPOSITORY # default current repository 
          github_token: ${{ secrets.GH_TOKEN }} # default ''
          days_before: '7' # default 30
          unique: true # default 'true'
          output_format: 'json' # default 'json'
```

The action requires parameters
- `github_repository`: OWNER/REPOSITORY , default will be current repository 
- `github_token`: ${{ secrets.GH_TOKEN }} # default ''
- `days_before`: '7' # default 30
- `unique`: true/false # default 'true' sorts out only unique emails if true
- `output_format`: 'json/list/string' # default 'json'
  - `json` format returns : ["email1@email.com","email2@email.com",...]
  - `list ` format returns : email1@email.com email2@email.com ...
  - `string` format returns : email1@email.com, email2@email.com,...

### Usage Example:

```
name: Get Recent Commit Authors
on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  get-commits-author:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2

      - name: Get Recent Commit Authors
        uses: AidarGatin/github-recent-commits-authors@v1.1
        id: recent-commits-authors
        with:
          github_repository: OWNER/REPOSITORY # default current repository 
          github_token: ${{ secrets.GH_TOKEN }} # default ''
          days_before: '7' # default 30
          unique: 'true' # default 'true'
          output_format: 'json' # default 'json'

      - name: Print Authors' Emails
        run: |
          echo "Authors' Emails: ${{ steps.recent-commits-authors.outputs.emails }}"
```
In the above example, the workflow is triggered whenever a push occurs on the main branch. It contains a job named `get-commits-author` that runs on the latest version of Ubuntu. The steps of the job include checking out the repository using the `actions/checkout` action and retrieving the recent commit authors using the GitHub action.<br>
The action requires a `GitHub token`, which can be provided as a repository secret `GH_TOKEN`. The `days_before` input specifies start day from todays date so last 7 days of the recent commits are considered, 
`unique` set to true, so only unique emails will get to output.`output_format` input determines the format of the output, set to 'json'.
Finally, the workflow prints the emails of the commit authors by accessing the output of the GitHub action using the `${{ steps.recent-commits-authors.outputs.emails }}`.
