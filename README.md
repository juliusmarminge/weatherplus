# Full Stack Webdev Template
This is a starting point for a TypeScript Next.js project including:
- [TailwindCSS](https://tailwindcss.com) for styling
- [Prisma](https://www.prisma.io) as ORM for handling DB requests
- [React Query](https://react-query.tanstack.com) for data-fetching
- [tRPC](https://trpc.io) for type safety between front- and backend


## Setup DB with PlanetScale
*Full documentation: [official docs](https://docs.planetscale.com/tutorials/planetscale-quick-start-guide#getting-started-—-planetscale-cli)*
### Prerequisites:
- [Planetscale CLI](https://github.com/planetscale/cli#installation)
- Node

1. Make sure you are authenticated
```sh
$ pscale auth login
```

2. Then, create the database
```sh
$ pscale database create <DATABASE_NAME> --region <REGION (eu-west)>
```
*Initialization of the database will take a while*

3. Create a development branch so that you can make changes
```sh
$ pscale branch create <DATABASE_NAME> <BRANCH_NAME (dev)>
```

4. Connect to the database using the new branch
```sh
$ pscale connect <DATABASE_NAME> <BRANCH_NAME> --port <PORT (3309)>
````

5. Modify the `DATABASE_URL` environment variable in [.env](.env)

6. Push the [Prisma schema](prisma/schema.prisma) to the database
```
$ npx prisma db push
```

7. Push the schema changes to production
```
# Promote `main` to production
$ pscale branch promote <DATABASE_NAME> main

# Create a deploy request to merge the changes from dev -> main
$ pscale deploy-request create <DATABASE_NAME> <BRANCH NAME (dev)>

# Deploy the deploy request to production (You may first have to find the DR_NUMBER by listing the deploy requests)
$ pscale deploy-request list <DATABASE_NAME>
$ pscale deploy-request deploy <DATABASE_NAME> <DR_NUMBER (1)>
```

Done, your database is now up to date with your Prisma schema!
