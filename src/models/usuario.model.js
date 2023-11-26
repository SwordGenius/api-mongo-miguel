const mongoose = require('mongoose');

const Usuario = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
    },
    apellidoPaterno:{
        type: String,
        required: true,
    },
    apellidoMaterno:{
        type: String,
        required: true,
    },
    matricula:{
        type: String,
        required: true,
    },
    deleted:{
        type: Boolean,
        required: false,
        default: false,
    },
    created_at:{
        type: Date,
        required: true,
        default: Date.now(),
    },
    updated_at:{
        type: Date,
        required: false,
    },
    deleted_at:{
        type: Date,
        required: false
    }
});

module.exports =
    mongoose.model('Usuario', Usuario);
