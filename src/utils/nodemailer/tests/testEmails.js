import {
    sendVerificationEmail,
    sendPasswordResetEmail,
    sendPasswordChangeConfirmation
} from './src/utils/nodemailer/authEmailService.js';

console.log('🧪 Tests manuels des fonctions email\n');

// Test 1: Vérification des fonctions
console.log('✅ Test 1: Fonctions disponibles');
console.log('- sendVerificationEmail:', typeof sendVerificationEmail === 'function' ? '✅' : '❌');
console.log('- sendPasswordResetEmail:', typeof sendPasswordResetEmail === 'function' ? '✅' : '❌');
console.log('- sendPasswordChangeConfirmation:', typeof sendPasswordChangeConfirmation === 'function' ? '✅' : '❌');

// Test 2: Email de vérification
console.log('\n✅ Test 2: Email de vérification...');

try {
    const result = await sendVerificationEmail('test@example.com', 'Test', 'token123');
    console.log('✅ Email de vérification envoyé, ID:', result?.messageId);

    if (result?.previewUrl) {
        console.log('🔗 Preview:', result.previewUrl);
    }
} catch (error) {
    console.log('❌ Erreur:', error.message);
}

// Test 3: Email de reset
console.log('\n✅ Test 3: Email de reset...');

try {
    const result = await sendPasswordResetEmail('test@example.com', 'resettoken123');
    console.log('✅ Email de reset envoyé, ID:', result?.messageId);

    if (result?.previewUrl) {
        console.log('🔗 Preview:', result.previewUrl);
    }
} catch (error) {
    console.log('❌ Erreur:', error.message);
}

// Test 4: Email de confirmation
console.log('\n✅ Test 4: Email de confirmation...');

try {
    const result = await sendPasswordChangeConfirmation('test@example.com', 'Test');
    console.log('✅ Email de confirmation envoyé, ID:', result?.messageId);

    if (result?.previewUrl) {
        console.log('🔗 Preview:', result.previewUrl);
    }
} catch (error) {
    console.log('❌ Erreur:', error.message);
}

console.log('\n🎉 Tests terminés !');
