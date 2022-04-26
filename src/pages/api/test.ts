import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, headers, query } = req;
  console.log("method", method);
  console.log("body", body);
  console.log("headers", headers);
  console.log("query", query);
  res.status(200).json({ method, body, headers, query });
};

export default handler;
