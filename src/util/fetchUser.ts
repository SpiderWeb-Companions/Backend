import { DBPool } from "../database";

export const fetchUser = async (email:string) => {

 try {
    const { rows } = await DBPool.query(`
        SELECT id FROM UserProfile WHERE $1;
      `,
      [email]);
      return rows;

    } catch (error) {
        return null;
    }

} 