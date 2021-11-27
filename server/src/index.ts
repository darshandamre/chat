import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entities/User";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "postgres",
    database: "chat",
    logging: true,
    synchronize: true,
    entities: [User]
  });
};

main().catch(err => {
  console.log(err);
});
