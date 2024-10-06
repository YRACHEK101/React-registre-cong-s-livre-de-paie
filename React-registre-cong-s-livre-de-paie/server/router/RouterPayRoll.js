import express from "express";
import pool from "../Connection_DB.js"// Importing Connection

const Router = express.Router();

// all Payroll list 
Router.get('/', async (req, res) => {
    try {
        const [result] = await pool.query('select * from payroll');
        res.json(result);
        res.status(200).json({ message: 'success' });
    } catch (error) {

    }
});

Router.post('/AddPayroll', async (req, res) => {
    const formData = req.body;

    const query = `
    INSERT INTO payroll (
        bulletin_number,period,full_name,employment,birth_date,entry_date,cnss_number,
        family_situation,deductions,hN,hs1,hs2,hs3,total,work_days,work_hours,
        gross_base_salary,bonuses,seniority,taxable_benefits,gross_salary,to_deduct,
        max_retirement,taxable_salary,taxabl,cnss_deduction,amo_deduction,tax,
        total_deductions,net_salary,non_taxable_bonuses,advances,dirhams_benefits,net_paid_dirhams)
        VALUES ?
        `;

        const values = [
            formData.bulletin_number, formData.period, formData.full_name, formData.employment, 
            formData.birth_date, formData.entry_date, formData.cnss_number, formData.family_situation, 
            formData.deductions, formData.hN, formData.hs1, formData.hs2, formData.hs3, formData.total, 
            formData.work_days, formData.work_hours, formData.gross_base_salary, formData.bonuses, 
            formData.seniority, formData.taxable_benefits, formData.gross_salary, formData.to_deduct, 
            formData.max_retirement, formData.taxable_salary, formData.cnss_deduction, formData.amo_deduction, 
            formData.tax, formData.total_deductions, formData.net_salary, formData.non_taxable_bonuses, 
            formData.adva, formData.advances, formData.dirhams_benefits, formData.net_paid_dirhams
        ];
        pool.query(query, values, (err, results) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(200).json({ message: 'Data successfully inserted' });
        });
})





export default Router;