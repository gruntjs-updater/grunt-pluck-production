grunt-pluck-production
======================

A simple grunt task to generate a copy of a repository with only production dependencies

Copies all files matching specified patterns, unless that file is part of an npm development
dependency.

Options
--------

`files` : **required** -- a set of glob patterns of files to copy.

`options.target` : **optional** -- target path into which the source files are copied.

