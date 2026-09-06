import { Router, Response } from 'express'
import { db } from '../db'
import { messages } from '../db/schema'
import { sql } from 'drizzle-orm'
import { authenticate, AuthRequest } from '../middleware/auth'
import { z } from 'zod'

const router = Router({ mergeParams: true })

router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const schema = z.object({
            body: z.string().min(1)
        })

        const data = schema.parse(req.body)
        const ticketId = parseInt(req.params.id as string)

        const [message] = await db.insert(messages).values({
            body: data.body,
            ticketId,
            authorId: req.user!.id,
        }).returning()

        const result = await db.execute(sql`
            SELECT m.*, u.name as author_name, u.email as author_email, u.role as author_role
            FROM messages m
            LEFT JOIN users u ON m.author_id = u.id
            WHERE m.id = ${message.id}
        `)

        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Invalid data' })
    }
})

export default router