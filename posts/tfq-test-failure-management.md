---
title: "Claude Code Powered Test Debugging Without The Context Overload"
date: "2025-08-31"
excerpt: "How I use TFQ (Test Failure Queue) to avoid hitting context limits when debugging test failures with Claude Code.  A simple CLI tool that queues failing tests and fixes them one at a time in separate headless sessions."
tags: ["Testing", "CLI", "Claude Code", "AI", "Context Management", "DevTools"]
featured: true
author: "Jeremy Watt"
seoTitle: "TFQ: Avoid Claude Code Context Limits When Debugging Tests"
metaDescription: "Stop running out of context when debugging large test suites with Claude Code; use a queue and fix failing tests individually in separate headless sessions."
---

Once a project gets some beef to it using Claude Code to debug a failing test suite can get dicey; its easy to hit session context limits once Claude gets noodling on dozens or hundreds of tests.

Its a natural limitation of context in and of itself, and doesn't need "solving" on the model level.  It just needs good engineered guardrail solutioning on the agentic IDE / coding level.

Right now I deal with limitation using a simple CLI queueing tool I used called [tfq](https://www.npmjs.com/package/tfq).  

`tfq` (short for Test Failure Queue) is a simple CLI tool that lets you run your whole test suite and queue up failing tests, that you can then sequentially address using Claude Code.  Each failed test is individually fed (along its failure / traceback, imports, etc.,) into a separate headless Claude Code session for fixing.  

This little tool makes managing the context on a per-test level a breeze, fixes tests much faster, and severely cuts down on test confusion / lying ("all tests look great and your app is now super production ready!!").

---

Here's basically how you use it after installing it.

1. Use the `tfq` `run-tests` command to run your full test suite (or your desired subset of it).  

```bash
# run your project's tests and store failures in the queue
tfq run-tests --auto-detect --auto-add
```

Use the flags `--auto-detect` to detect your setup (e.g., js / ts, python, ruby) automatically and `--auto-add` to add failing tests to the `tfq` queue.

You can see your failing tests as

```bash
# see all failed tests currently in the queue
tfq list
```

There are a host of CLI commands to `clear`, `resolve`, and `group` tests as well (see [the repo here for details](https://github.com/neonwatty/tfq)).


2.  **Let CLaude Code fix a test**

When ou install `tfq` it automatically finds loops in your Claude Code for fixing individual tests headlessly.  You'll see a config file on instnatiation of `tfq` that looks like this, porting over all of Claude Code's current options.

```json
{
  "claude": {
    // Basic
    "enabled": true,
    "claudePath": "/path/to/claude",

    // Test params
    "maxIterations": 10,
    "testTimeout": 300000,

    // Prompts
    "prompt": "Run the test file at {testFilePath} and debug any errors you encounter one at a time. Then run the test again to verify that your changes have fixed any errors.",

    
    // Security & Permissions
    "dangerouslySkipPermissions": true,
    "allowedTools": ["Edit", "Read", "Write"],
    ....
  }
}
```

You can then have Claude fix the next test in your `tfq` queue

```bash
# fix your next failed test in the queue using headless claude code
tfq fix-next
```

Or sequentially loop through and fix each failed test

```bash
# fix each failed test in the queue sequentially using headless claude code
tfq fix-all
```

---

Nothing magical here - just much needed structure for test fixing by managing context in an ordered fashion.