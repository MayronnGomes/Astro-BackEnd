const nodemailer = require('nodemailer');
const { username } = require('./db');
require('dotenv').config()

const mailTransporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
})

module.exports = {
    sendMailNotificationAdicionado: async (to, userNome, acaoExtensaoNome) => {
        return await mailTransporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject: `🎉 Você se tornou membro da ação: ${acaoExtensaoNome}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #0056b3;">🎉 Você foi adicionado à ação</h2>
                    <p>Olá, <strong>"${userNome}"</strong></p>
                    <p>Você foi adicionado como membro da ação de extensão <strong>"${acaoExtensaoNome}"</strong>.</p>
                    <p>Para mais detalhes e acompanhamento das atividade, clique no link abaixo e acesse o sistema Astro🪐:</p>
                    <p><a href="http://localhost:3000" style="color: #0056b3;">Sistema Astro</a></p>
                    <hr style="border: 1px solid #ddd; margin: 20px 0;">
                    <p style="font-size: 12px; color: #777;">Este é um e-mail automático. Por favor, não responda.</p>
                </div>
            `
        });
    },
    sendMailNotificationRemovido: async (to, userNome, acaoExtensaoNome, senderName) => {
        return await mailTransporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject: `🔔 Você foi removido da ação: ${acaoExtensaoNome}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #0056b3;">🔔 Você foi removido da ação</h2>
                    <p>Olá, <strong>"${userNome}"</strong></p>
                    <p><strong>${senderName}</strong> removeu você da ação de extensão <strong>"${acaoExtensaoNome}"</strong>.</p>
                    <p>As atividades que você realizou nesta ação ficam salvas na seção <strong>"Atividades"</strong>.</p>
                    <p>Para mais detalhes e acompanhamento das atividade, clique no link abaixo e acesse o sistema Astro🪐:</p>
                    <p><a href="http://localhost:3000" style="color: #0056b3;">Sistema Astro</a></p>
                    <hr style="border: 1px solid #ddd; margin: 20px 0;">
                    <p style="font-size: 12px; color: #777;">Este é um e-mail automático. Por favor, não responda.</p>
                </div>
            `
        });
    },
    sendMailNotificationCriado: async (to, atividade, userNome, acaoExtensaoNome, senderName) => {
        return await mailTransporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject: `🔔 Nova Atividade Criada: ${atividade.nome} em ${acaoExtensaoNome}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #0056b3;">🔔 Nova atividade em ação de extensão</h2>
                    <p>Olá, <strong>${userNome}</strong></p>
                    <p><strong>${senderName}</strong> criou uma nova atividade na ação de extensão <strong>"${acaoExtensaoNome}"</strong>.</p>
                    <p>Confira as informações da atividade:</p>
                    <ul>
                        <li><strong>Nome da Atividade:</strong> ${atividade.nome}</li>
                        <li><strong>Local:</strong> ${atividade.local}</li>
                        <li><strong>Status:</strong> ${atividade.status}</li>
                    </ul>
                    <p>Para mais detalhes e acompanhamento das atividade, clique no link abaixo e acesse o sistema Astro🪐:</p>
                    <p><a href="http://localhost:3000" style="color: #0056b3;">Sistema Astro</a></p>
                    <hr style="border: 1px solid #ddd; margin: 20px 0;">
                    <p style="font-size: 12px; color: #777;">Este é um e-mail automático. Por favor, não responda.</p>
                </div>
            `
        });
    },
    sendMailNotificationRetirado: async (to, atividadeNome, userNome, acaoExtensaoNome, senderName) => {
        return await mailTransporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject: `🔔 Você foi removido da atividade: ${atividadeNome} em ${acaoExtensaoNome}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #0056b3;">🔔 Você foi removido da atividade</h2>
                    <p>Olá, <strong>${userNome}</strong></p>
                    <p><strong>${senderName}</strong> removeu você da atividade <strong>"${atividadeNome}"</strong> na ação de extensão <strong>"${acaoExtensaoNome}"</strong>.</p>
                    <p>Para mais detalhes e acompanhamento das atividade, clique no link abaixo e acesse o sistema Astro🪐:</p>
                    <p><a href="http://localhost:3000" style="color: #0056b3;">Sistema Astro</a></p>
                    <hr style="border: 1px solid #ddd; margin: 20px 0;">
                    <p style="font-size: 12px; color: #777;">Este é um e-mail automático. Por favor, não responda.</p>
                </div>
            `
        });
    },
    sendMailNotificationFinalizado: async (to, atividadeNome, userNome, acaoExtensaoNome, senderName, novoStatus) => {
        return await mailTransporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject: `🔄 Status Atualizado para a Atividade: ${atividadeNome}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #0056b3;">🔄 Status Atualizado</h2>
                    <p>Olá, <strong>${userNome}</strong></p>
                    <p><strong>${senderName}</strong> atualizou o status da atividade <strong>"${atividadeNome}"</strong> da ação de extensão <strong>"${acaoExtensaoNome}"</strong> para <strong>${novoStatus}</strong>.</p>
                    <p>Para mais detalhes e acompanhamento das atividade, clique no link abaixo e acesse o sistema Astro🪐:</p>
                    <p><a href="http://localhost:3000" style="color: #0056b3;">Sistema Astro</a></p>
                    <hr style="border: 1px solid #ddd; margin: 20px 0;">
                    <p style="font-size: 12px; color: #777;">Este é um e-mail automático. Por favor, não responda.</p>
                </div>
            `
        });
    },
    sendMailNotificationDeletado: async (to, atividadeNome, userNome, acaoExtensaoNome, senderName) => {
        return await mailTransporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject: `❌ A atividade: ${atividadeNome} foi excluída da ação ${acaoExtensaoNome}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #cc0000;">❌ A atividade foi excluída</h2>
                    <p>Olá, <strong>${userNome}</strong></p>
                    <p><strong>${senderName}</strong> excluiu a atividade <strong>"${atividadeNome}"</strong> da ação de extensão <strong>"${acaoExtensaoNome}"</strong>.</p>
                    <p>A atividade que você realizou fica salva na seção <strong>"Atividades"</strong>.</p>
                    <p>Para mais detalhes e acompanhamento das atividade, clique no link abaixo e acesse o sistema Astro🪐:</p>
                    <p><a href="http://localhost:3000" style="color: #0056b3;">Sistema Astro</a></p>
                    <hr style="border: 1px solid #ddd; margin: 20px 0;">
                    <p style="font-size: 12px; color: #777;">Este é um e-mail automático. Por favor, não responda.</p>
                </div>
            `
        });
    },
};


