import { runCLI } from "@jest/core"

async function main() {
  const configModule = await import("../jest.config.mjs")
  const config = configModule.default

  console.log("Starting Jest with config:", JSON.stringify(config, null, 2))

  const { results } = await runCLI(
    {
      // Pass config as string for @jest/core
      config: JSON.stringify(config),
      // Fail the run if no tests found to avoid silent success
      passWithNoTests: false,
    },
    [process.cwd()]
  )

  console.log(
    `Jest finished: ${results.numPassedTests} passed, ${results.numFailedTests} failed across ${results.numTotalTests} tests in ${results.numTotalTestSuites} suites.`
  )

  if (results.numFailedTests > 0 || results.numFailedTestSuites > 0) {
    // Non-zero exit indicates failure in logs
    process.exitCode = 1
  }
}

main().catch((err) => {
  console.error("Jest runner error:", err)
  process.exitCode = 1
})
