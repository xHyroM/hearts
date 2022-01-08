import type { NextApiRequest, NextApiResponse } from 'next'
import { getHearts } from '../../utils/hearths';

type Data = {
  name: string;
  message: string;
}

export const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) =>{
  const hearts = await getHearts();

  res.status(200).json({
    name: 'OK',
    message: hearts
  })
}

export default handler;