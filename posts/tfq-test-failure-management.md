---
title: "Claude Code Powered Test Debugging Without The Context Overload"
date: "2025-08-31"
excerpt: "How I use TFQ (Test Failure Queue) to avoid hitting context limits when debugging test failures with Claude Code.  A simple CLI tool that queues failing tests and fixes them one at a time in separate headless sessions."
tags: ["Testing", "Claude Code", "CLI"]
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

Here's basically how you use it after installing it.  Say you had a simple javascript projec for a calculator app, consisting of a few files.

1. Use the `tfq` `run-tests` command to run your full test suite (or your desired subset of it).  

```bash
# run your project's tests and store failures in the queue
$ tfq run-tests --auto-detect
Auto-detected: JavaScript project using Jest
Running: npm test
=============================================
  PASS  src/utils/validator.test.js
  PASS  src/services/user.test.js
  FAIL  src/utils/calculator.test.js
  FAIL  src/api/auth.test.js
  FAIL  src/components/Button.test.js
=============================================
Test Suites: 3 failed, 2 passed, 5 total
Tests:       8 failed, 15 passed, 23 total

✗ 3 tests failed
- src/utils/calculator.test.js
- src/api/auth.test.js
- src/components/Button.test.js
```

Use the flags `--auto-detect` to detect your setup (e.g., js / ts, python, ruby and the corresponding test framework your using), and `--auto-add` to add failing tests to your `tfq` queue.

You can see your failing tests as

```bash
# see all failed tests currently in the queue
$ tfq list
Queue contains 3 file(s):
1. src/utils/calculator.test.js (1 failure)
2. src/api/auth.test.js (1 failure)
3. src/components/Button.test.js (1 failure)
```

There are a host of CLI commands to `clear`, `resolve`, and `group` tests as well (see [the repo here for details](https://github.com/neonwatty/tfq)).


2.  **Let CLaude Code fix a test**

When ou install `tfq` it automatically finds loops in Claude Code for fixing individual tests in headless mode.  You'll see a config file on instnatiation of `tfq` that looks like this, porting over all of Claude Code's current options.

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

You can configure your (system) prompt, tools, etc., just like you would at the command line.

In the default prompt `testFilePath` is resolved automatically; its an absolute path to the next failed test in your `tfq` queue.

You can then have Claude fix the next test in your `tfq` queue

```bash
# fix your next failed test in the queue using headless claude code
tfq fix-next
```

This command

- dequeues the next failed test in your `tfq` queue, and provides its absolute `testFilePath` to Claude along with your prompt and other configs
- runs Claude Code in [headless mode](https://docs.anthropic.com/en/docs/claude-code/sdk/sdk-headless) to fix the test
- re-tests the test afterwards - if it fails, then its added back to your `tfq` queue

You can run the same operation sequentially on each failed test in your queue with

```bash
# fix each failed test in the queue sequentially using headless claude code
tfq fix-all
```

---

Nothing magical here - just much needed structure for test fixing by managing context in an ordered fashion.