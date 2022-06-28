export {};
/**
 * @swagger
 * tags:
 *  name: User
 *  description: User entity operations
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Users list.
 *     description: Returns a user list registered on system.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       produces:
 *         - application/json
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unautorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
