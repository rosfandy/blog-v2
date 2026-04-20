---
tags:
  - golang
date: 2026-04-13
description: Golang open source cli based tools for supabase http proxy
duration: "5"
status: published
thumbnail: https://lh3.googleusercontent.com/aida-public/AB6AXuC1jaA0lzZke-EWvySPpvBQNKpI8FUsL_D2dOYvIJu_8aXe6PUNbBVKdC-VrIaCqwJkl-tuE6BuPzK_3WXNfU5fhhm_JaWpCyr0cKkP2nAepn4m0_9wv_3RESVPLjWcTxb8gr8Q0y82p7VztSEaAcmg7fySyB-oL4woCoyWKQbZLTWGlmtIywTpq7acuUdAU1-MfpgzWfuDZ3Xzg_YC1Yk_xEl6nilm3uYCUFsbSQUGWhLGilUjwj8moDvNhTFCR69O8i3DuwVraaw
category: backend
---
# Repository
---
https://github.com/rosfandy/supago

# About Project
---
Supago is a CLI tool that provides a proxy layer between your applications and Supabase.

# Features
---
- Execute Query (Database as Code)
- Pull Table Schema from Supabase
- Push Table Schema to Supabase

# How to use
---
1. Available Command
```
go run cmd/main.go help
```

```
Supago CLI

Usage:
  supago [command]

Available Commands:
  completion  Generate the autocompletion script for the specified shell
  help        Help about any command
  pull        Pull Supabase Model
  server      Start Supago server

Flags:
  -h, --help   help for supago

Use "supago [command] --help" for more information about a command.
```

2. Running Server
```
go run cmd/main.go server
```
3. Pull model
```
go run cmd/main.go pull -h                                                                          

Pull table schema from Supabase and display column information

Usage:
  supago pull <table_name> [flags]
  supago pull [command]

Examples:
supago pull blogs

Available Commands:
  check       Check database setup
  setup       Setup database functions

Flags:
  -h, --help   help for pull

```

```
go run cmd/main.go pull profiles                                                                    

Table: Blogs
Columns:
  • id                   bigint          NOT NULL   default: -
  • title                character varying NULL       default: -
  • description          text            NULL       default: -
  • content              text            NULL       default: -
  • tags                 character varying NULL       default: -
  • status               character varying NULL       default: -
  • category             character varying NULL       default: -
  • created_at           timestamp with time zone NOT NULL   default: now()
  • author_id            uuid            NULL       default: -
  • date                 date            NULL       default: -
  • type                 character varying NULL       default: -
  • thumbnail            character varying NULL       default: -

Generated model: internal/domain/blogs.go
```
4. Push Model
```
go run cmd/main.go push -h

Push table schema to supabase

Usage:
  supago push <table_name> [flags]

Flags:
  -h, --help          help for push
      --path string   Directory for table schema (default "internal/domain")
```

```
go run cmd/main.go push examples 

Executing Query...
CREATE TABLE Examples (
  id BIGINT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);
table 'examples' pushed successfully
```