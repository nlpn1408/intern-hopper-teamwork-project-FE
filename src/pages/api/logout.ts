
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/')
    return res.status(200).json({ message: 'Đăng xuất thành công' })
  }

  return res.status(405).json({ message: 'Phương thức không được hỗ trợ' })
}
