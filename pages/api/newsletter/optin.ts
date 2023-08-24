import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

const URL = process.env.SUPABASE_URL;
const dbClient = createClient(URL, process.env.SUPABASE_KEY);

const controllerByMethod =  {
  async POST(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body)

    const email = req.body.email;
    if(!Boolean(email)){
      res.
      status(400)
      .json({ message: 'email not informed' })
      return;
    }

    const {data, error} = await dbClient
    .from("users")
    .insert({
      email: req.body.email,
      optin: true,
    })

    if(error){
      res.
      status(500)
      .json({ message: 'internal error', error })
      return;
    }

    // await dbClient.auth.admin.createUser({ email }) // criar usuario no sistema
    res.
      status(200)
      .json({ message: 'success post request', data })
  },
  async GET(req: NextApiRequest, res: NextApiResponse) {
    const {data, error} = await dbClient
      .from("users")
      .select("*");

  if(error){
    res.
    status(500)
    .json({ message: 'error get users request', error })
    return;
  }
    res.
    status(200)
    .json({ message: 'success get users request', data, length: data.length })


  }

}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const controller = controllerByMethod[req.method];
  if(!controller){
    res.status(404).json({ message: 'method not found' });
    return;
    
  }
  controller(req, res);
}
