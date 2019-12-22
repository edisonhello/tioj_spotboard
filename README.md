# TIOJ Spotboard

A tool that dump submissions to runs of spotboard.

## Usage

The algorithm of password in MySQL has changed in this MySQL version, one may follow the following instruction to fix this:

```
set global validate_password.policy=0; // this two line is for short weak password
set global validate_password.length=1;
alter user 'root'@'localhost' identified by 'new_password';
```

.

Note that the problem id must start from 0 in runs.

