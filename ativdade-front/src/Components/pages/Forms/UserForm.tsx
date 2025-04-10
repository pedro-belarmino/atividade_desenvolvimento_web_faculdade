import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Snackbar from "@mui/material/Snackbar"
import TextField from "@mui/material/TextField"
import axios from "axios"
import { useState, useEffect } from "react"

interface alunoType {
    nome: string
    telefone: string
    email: string
    endereco: string
}

const initialAluno: alunoType = {
    nome: '',
    telefone: '',
    email: '',
    endereco: ''
}

const FIELD_LIMITS = {
    nome: 100,
    telefone: 15,
    email: 100,
    endereco: 200
}

export default function UserForm() {
    const [aluno, setAluno] = useState<alunoType>(initialAluno)
    const [errorSnackbar, setErrorSnackbar] = useState(false)
    const [errorSnackbarMessage, setErrorSnackbarMessage] = useState('')
    const [characterCount, setCharacterCount] = useState({
        nome: 0,
        telefone: 0,
        email: 0,
        endereco: 0
    })

    useEffect(() => {
        setCharacterCount({
            nome: aluno.nome.length,
            telefone: aluno.telefone.length,
            email: aluno.email.length,
            endereco: aluno.endereco.length
        })
    }, [aluno])

    const handleClose = () => {
        setErrorSnackbar(false)
    }

    const formatPhone = (value: string): string => {
        const cleaned = value.replace(/\D/g, '')

        if (cleaned.length <= 2) {
            return cleaned
        }
        if (cleaned.length <= 6) {
            return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`
        }
        if (cleaned.length <= 10) {
            return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`
        }
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        let processedValue = value
        if (name === 'telefone') {
            processedValue = formatPhone(value)
        }

        if (processedValue.length > FIELD_LIMITS[name as keyof typeof FIELD_LIMITS]) {
            return
        }

        setAluno(prevState => ({
            ...prevState,
            [name]: processedValue
        }));
    };

    const validateFields = () => {
        if (!aluno.nome.trim()) {
            setErrorSnackbarMessage('Preencha o campo nome')
            setErrorSnackbar(true)
            return false
        }

        if (!aluno.telefone.trim()) {
            setErrorSnackbarMessage('Preencha o campo telefone')
            setErrorSnackbar(true)
            return false
        }

        if (aluno.telefone.replace(/\D/g, '').length < 10) {
            setErrorSnackbarMessage('Telefone inválido')
            setErrorSnackbar(true)
            return false
        }

        if (!aluno.email.trim()) {
            setErrorSnackbarMessage('Preencha o campo email')
            setErrorSnackbar(true)
            return false
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(aluno.email)) {
            setErrorSnackbarMessage('E-mail inválido')
            setErrorSnackbar(true)
            return false
        }

        if (!aluno.endereco.trim()) {
            setErrorSnackbarMessage('Preencha o campo endereço')
            setErrorSnackbar(true)
            return false
        }

        return true
    }

    const save = async () => {
        if (!validateFields()) return

        try {
            const response = await axios.post('http://localhost:8081/alunos', aluno)
            console.log(response.data)
            setAluno(initialAluno)
        } catch (error) {
            console.log(error)
            setErrorSnackbarMessage('Erro ao salvar aluno')
            setErrorSnackbar(true)
        }
    }

    return (
        <div className="flex space-x-10 divide-x-2 divide">
            <div>
                <p className="flex justify-between text-2xl bg-gray-800 p-3 m-3 rounded-xl">Cadatro de aluno!</p>
            </div>
            <div className="flex flex-col bg-gray-800 p-7 rounded-xl space-y-2">
                <div>
                    <TextField
                        name="nome"
                        onChange={handleInput}
                        label="Nome"
                        variant="outlined"
                        value={aluno.nome}
                        fullWidth
                        helperText={`${characterCount.nome}/${FIELD_LIMITS.nome}`}
                    />
                </div>
                <div>
                    <TextField
                        name="telefone"
                        onChange={handleInput}
                        label="Telefone"
                        variant="outlined"
                        value={aluno.telefone}
                        fullWidth
                        placeholder="(XX) XXXXX-XXXX"
                        helperText={`${characterCount.telefone}/${FIELD_LIMITS.telefone}`}
                    />
                </div>
                <div>
                    <TextField
                        name="email"
                        onChange={handleInput}
                        label="E-mail"
                        variant="outlined"
                        value={aluno.email}
                        fullWidth
                        helperText={`${characterCount.email}/${FIELD_LIMITS.email}`}
                    />
                </div>
                <div>
                    <TextField
                        name="endereco"
                        onChange={handleInput}
                        label="Endereço"
                        variant="outlined"
                        value={aluno.endereco}
                        fullWidth
                        helperText={`${characterCount.endereco}/${FIELD_LIMITS.endereco}`}
                    />
                </div>
                <div className="place-self-center">
                    <Button variant="contained" onClick={save}>Salvar</Button>
                </div>
            </div>
            <Snackbar open={errorSnackbar} autoHideDuration={3000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {errorSnackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}