# DevLog

DevLog is an automated GitHub progress tracking bot that transforms daily development activity into meaningful summaries.

The project was built to solve a personal problem: staying consistent with sharing development progress publicly without manually rewriting Git commit history into social media updates.

Instead of posting raw commit messages, DevLog collects development activity throughout the day, generates a high-level summary of the work completed, and sends it to Discord for approval before publishing.

---

## Motivation

When building projects, I often wanted to share progress updates on X (Twitter) as part of learning in public.

The problem was that commit messages are usually written for developers, not for public updates.

For example:

* `fix padding issue`
* `update webhook route`
* `change button styles`

These commits may be useful internally but are not meaningful public updates.

DevLog aims to answer a more useful question:

> What did I actually work on today?

---

## Current Workflow

```text
Git Push
    ↓
GitHub Webhook
    ↓
Render Backend
    ↓
Neon PostgreSQL
    ↓
Store Commits
    ↓
End of Day
    ↓
Generate Summary
    ↓
Discord Review
    ↓
Approve / Skip
    ↓
Post to X
```

---

## Architecture

### GitHub Webhooks

DevLog uses GitHub Webhooks instead of polling GitHub's API.

This allows the backend to receive updates only when new commits are pushed, avoiding unnecessary API requests and resource usage.

### Render

The backend is deployed on Render so the application remains available without depending on a local machine being online.

### Neon PostgreSQL

Commit data is stored in Neon PostgreSQL.

A cloud-hosted database allows commit history to persist independently of the developer's machine and makes it possible to generate summaries later in the day.

### Discord Bot

Discord acts as the approval layer.

Instead of publishing every generated update automatically, DevLog sends the summary to Discord where it can be reviewed before publication.

This prevents low-value updates from being posted publicly.

---

## Why Store Commits?

Commits are stored throughout the day rather than processed immediately.

This enables DevLog to:

* Collect all development activity
* Build a complete picture of the day's work
* Generate a higher-quality summary
* Avoid posting individual commit updates

---

## Role of AI

The AI component is not intended to simply rewrite commit messages.

Instead, its role is to identify meaningful accomplishments from a collection of commits and generate a concise summary of the work completed.

For example:

Raw commits:

```text
add webhook endpoint
connect postgres
add discord approval buttons
```

Desired summary:

```text
Built the core DevLog backend pipeline, enabling GitHub activity
to be captured, stored, reviewed, and prepared for publication.
```

The goal is to focus on outcomes rather than implementation details.

---

## Current Features

* GitHub webhook integration
* Render deployment
* Neon PostgreSQL storage
* Commit persistence
* Commit retrieval
* Discord bot integration
* Summary generation pipeline
* Approve / Skip workflow

---

## Future Plans

* AI-generated development summaries
* Automated daily summary scheduling
* X (Twitter) integration
* Persistent approval history
* Multi-platform publishing
* Multi-user support
* GitHub account linking
* Discord bot onboarding
* Social account integrations

---

## Status

Currently under active development as a personal tool.

The long-term goal is to create a workflow that helps developers maintain a personal development journal while making it easier to share meaningful progress publicly.
