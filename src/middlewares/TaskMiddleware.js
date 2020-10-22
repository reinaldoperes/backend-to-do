const TaskModel = require('../model/TaskModel');
const { isPast } = require('date-fns');

const TaskMiddleware = async(req, res, next) => {
    const { macaddress, type, title, description, when } = req.body;

    if (!macaddress)
        return res.status(400).json({ error: 'macadress é obrigatório' });
    else if (!type)
        return res.status(400).json({ error: 'tipo é obrigatório' });
    else if (!title)
        return res.status(400).json({ error: 'título é obrigatório' });
    else if (!description)
        return res.status(400).json({ error: 'descrição é obrigatório' });
    else if (!when)
        return res.status(400).json({ error: 'quando é obrigatório' });
    else if (isPast(new Date(when)))
        return res.status(400).json({ error: 'quando deve ser uma data no futuro' });
    else {
        let exists;

        exists = await TaskModel
                        .findOne(
                            {
                                'when': {'$eq': new Date(when)},
                                'macaddress': {'$in': macaddress}
                            });
        
        if (exists) {
            return res.status(400).json({ error: 'já existe uma tarefa nesse dia e horário' });
        }                            

        next();
    }
}

module.exports = TaskMiddleware;