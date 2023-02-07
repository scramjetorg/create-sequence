#!/usr/bin/env node

const { getPackageManager } = require("pkg-install");

const Module = require("module");
const fse = require('fs-extra');

const execa = require("execa");
const fs = require("fs");
const path = require("path");

const useRequireResolveOptions = true;
const templateName = process.argv[2] || "default";
const mainFieldRegExp = /^(\s*)("main":.*?)(,)?(\r?\n)/m

function initFiles() {
  const pkgPath = path.resolve("package.json")

  if (! fs.existsSync(pkgPath)) {
    return
  }

  const pkgString = fs.readFileSync(pkgPath, "utf8")
  const pkgJSON = JSON.parse(pkgString)
  const fixturesPath = path.resolve(__dirname, "fixtures", templateName)
  const fixturePkgJSON = (() => {
    try {
      return JSON.parse(fs.readFileSync(path.resolve(fixturesPath, "package.json"), "utf8"));
    } catch (_e) {
      console.error(`WARN: Error while reading package.json from ${fixturesPath}`, _e);
      
      return {};
    }
  })()

  fse.copySync(fixturesPath, path.resolve())
  fs.writeFileSync(pkgPath, {...pkgJSON, ...fixturePkgJSON})
}

function initPackage(pkgManager) {
  const args = process.argv
    .slice(3)
    .filter((arg) => arg.startsWith("-")) 
    // fix for --

  return execa(pkgManager, ["init", ...args], {
    stdio: "inherit"
  })
}

getPackageManager({})
  .then((pkgManager) =>
    Promise
      .resolve()
      // Add a newline to stdout between the create-esm installation and
      // the package initialization.
      // eslint-disable-next-line no-console
      .then(() => console.log(""))
      .then(() => initPackage(pkgManager))
      .then(() => initFiles(pkgManager))
  )
  .catch(console.error)