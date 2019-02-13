# AB Package

AB Testing tool for modern application.

## Project setup

*You must clone this repository at this path: ~/Sites/AB-Package, on your mac to avoid having to update package.json*

```
$ git clone git@github.com:foxted/AB-Package.git ~/Sites/AB-Package
$ npm install
$ npm link
```

## Execution

Global buckets: allow 2 buckets for now
Experiment status: live or draft
Maximum audience includes: 10
Maximum audience excludes: 10

1. Generate or retrieve global visitor bucket
2. Retrieve query params
3. Qualify user based on bucket and other parameters
