import express, { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const app = express();

app.use(express.json());

const appointmentsRouter = Router();

interface Appointment {
    id: string;
    employee: string;
    date: Date;
}

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
    const { employee, date } = request.body;

    // aqui estamos convertendo a data Timestamp que recebemos do JSON
    // para o formato data do JS
    const parsedDate = startOfHour(parseISO(date));

    const appointment = {
        id: uuid(),
        employee,
        date: parsedDate,
    };

    // estamos realizando a verificação de se temos a mesma data cadastra no nosso array
    // a função isEqual faz parte da biblioteca date-fns e comparar datas do JS
    const verifyAppintmentDate = appointments.find(appointmento =>
        isEqual(parsedDate, appointmento.date),
    );

    // retornamos com codigo http que a data ja foi cadastrada
    if (verifyAppintmentDate) {
        return response
            .status(400)
            .json({ message: 'This appointment is already booked!' });
    }

    appointments.push(appointment);

    return response.json(appointments);
});

export default appointmentsRouter;
