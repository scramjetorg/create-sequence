#!/usr/bin/env node
/* eslint-disable no-console */

"use strict"

const fse = require("fs-extra")
const init = require("init-package-json")
const fs = require("fs/promises")
const path = require("path")

const templateName = process.argv[2] || "js-transformer"

const exists = async (path) => {
  return fs.access(path)
    .then(
      () => true,
      () => false
    )
}

async function initFiles() {
  const packageJsonPath = path.resolve("package.json")

  if (await exists(packageJsonPath)) {
    throw new Error("Error: package.json already exists in current location")
  }

  const templatesPath = path.join(__dirname, "templates", path.resolve("/", templateName))

  if (!(await exists(templatesPath))) {
    throw new Error(`Error: Template ${templateName} couldn't be found`)
  }

  const workingDirectory = path.resolve()

  const workingDirectoryFiles = await fs.readdir(workingDirectory)
  const templatesDirectoryFiles = await fs.readdir(templatesPath)

  for (const file of templatesDirectoryFiles) {
    if (workingDirectoryFiles.includes(file)) {
      throw new Error(`Error: ${file} already exists in current location`)
    }
  }

  const templatePackageJSON = await (async () => {
    try {
      return JSON.parse(await fs.readFile(path.resolve(templatesPath, "package.json"), "utf8"))
    } catch (_e) {
      throw new Error("Error while reading template package.json")
    }
  })()

  return {
    packageJsonPath,
    templatesPath,
    workingDirectory,
    templatePackageJSON
  }
}

async function initPackage(data) {
  const { templatePackageJSON, packageJsonPath, workingDirectory } = data

  console.log("")

  {
    const { name, version, main, engines } = templatePackageJSON;
    await fs.writeFile(packageJsonPath, JSON.stringify({ name, version, main, engines }, null, 2))
  }

  const userPackageJSON = await init(workingDirectory, path.resolve(__dirname, "default-input.js"), templatePackageJSON)

  console.log("")

  if (!userPackageJSON) {
    throw new Error("Sequence template initialization canceled")
  }

  const packageJson = { ...templatePackageJSON, ...userPackageJSON }
  if (userPackageJSON.scripts.test === 'echo "Error: no test specified" && exit 1') {
    delete userPackageJSON.scripts.test
  }

  packageJson.scripts = { ...templatePackageJSON.scripts, ...userPackageJSON.scripts }
  data.pkgJSON = packageJson

  return data
}

async function copyFiles(data) {
  const { templatesPath, workingDirectory } = data

  await fse.copy(templatesPath, workingDirectory, { overwrite: false, errorOnExist: true, filter: (src) => !src.endsWith("package.json") })
  return data
}

async function copyPackage(data) {
  const { packageJsonPath, pkgJSON } = data

  await fs.writeFile(packageJsonPath, JSON.stringify(pkgJSON, null, 2))
  console.log("Sequence template succesfully created")
  return data
}

function errorHandler(error) {
  console.error(error.message ? error.message : error)
}

Promise
  .resolve()
  .then(initFiles)
  .then(initPackage)
  .then(copyFiles)
  .then(copyPackage)
  .catch(errorHandler)
