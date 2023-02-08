#!/usr/bin/env node

"use strict";

const { getPackageManager } = require("pkg-install");

const Module = require("module");
const fse = require('fs-extra');

const execa = require("execa");
const fs = require("fs");
const path = require("path");

const templateName = process.argv[2] || "default";

function initFiles() {
  const pkgPath = path.resolve("package.json")

  if (! fs.existsSync(pkgPath)) {
    return
  }

  const pkgString = fs.readFileSync(pkgPath, "utf8")
  const pkgJSON = JSON.parse(pkgString)
  const fixturesPath = path.join(__dirname, "fixtures", path.resolve("/", templateName))

  if (! fs.existsSync(fixturesPath)) {
    throw new Error(`Template ${templateName} couldn't be found`);
  }


  const fixturePkgJSON = (() => {
    try {
      return JSON.parse(fs.readFileSync(path.resolve(fixturesPath, "package.json"), "utf8"));
    } catch (_e) {
      console.error(`WARN: Error while reading package.json from ${fixturesPath}`, _e);
      
      return {};
    }
  })()

  fse.copySync(fixturesPath, path.resolve())
  fs.writeFileSync(pkgPath, JSON.stringify({...fixturePkgJSON, ...pkgJSON}, null, 2));
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