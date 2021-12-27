module.exports = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        config: 'conventional-changelog-gitmoji-config',
        // releaseRules: [{ type: 'build', release: 'patch' }],
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        config: 'conventional-changelog-gitmoji-config',
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
        changelogTitle: '# Changelog',
      },
    ],
    // '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],
        message:
          ':bookmark: chore(release): ${nextRelease.gitTag} [skip ci] \n\n${nextRelease.notes}',
      },
    ],
  ],
};
