/*
 * Copyright (c) 15/05/2021 15:55
 * @author Ronald Tchuekou
 * @email  ronaldtchuekou@gmail.com
 */
const BACKEND = 'https://tpinf366-back.herokuapp.com/api/';

const Constants = {
    APP_NAME: 'Request Manager',
    APP_USER_ID: 'app__user_id__',
    APP_USER_STATUT: 'app__user_statut__',
    DEPARTEMENTS: [
        {label: '....', value: ''},
        {label: 'Maths - Info', value: 'MATH/INFO'},
        {label: 'Biochimie', value: 'BIOCHIMIE'},
        {label: 'Chimie', value: 'CHIMIE'},
        {label: 'Physique', value: 'PHYSIQUE'},
    ],
    FILIERES: [
        {label: '....', value: ''},
        {label: 'Informatique', value: 'IN'},
        {label: 'Mathematique', value: 'MA'},
        {label: 'Chimie', value: 'CH'},
        {label: 'Physique', value: 'PH'},
        {label: 'Biochimie', value: 'BIO'},
    ],
    REQUEST_OBJECTS: [
        {label: '....', value: ''},
        {label: 'Non publication de note(s)', value: 'NPN'},
        {label: 'DNP', value: 'DNP'},
        {label: 'Calcul crédit', value: 'Cal credit'},
        {label: 'Erreur sur relevé de note', value: 'Note book error'},
        {label: 'Pris en compte d\'acquis', value: 'Acqui Charge'},
        {label: 'Demande des équivalences', value: 'Equi Ask'},
        {label: 'Erreur ou abscence de note de cc', value: 'CC note abs'},
        {label: 'Erreur ou abscence de note de tpe', value: 'TPE note abs'},
        {label: 'Erreur ou abscence de note de tp', value: 'TP note abs'},
        {label: 'Erreur ou abscence de note de examen', value: 'EXAM note abs'},
        {label: 'Erreur de matricule', value: 'Mat error'},
        {label: 'Erreur sur le nom', value: 'Name error'},
        {label: 'Erreur sur la date de naissance', value: 'Birth error'},
        {label: 'Erreur d\'option', value: 'Option error'},
        {label: 'Abscence de nom', value: 'Name abs'},
        {label: 'Erreur de parcours type', value: 'Level error'},
        {label: 'Changement de parcours type', value: 'Change level'},
        {label: 'Changement de filière', value: 'Change Fil'},
        {label: 'Demande de certificat de scolarité', value: 'Certif scolar'},
        {label: 'Adminssion spéciale à la session de rattrapage', value: 'Admin Ratt'},
        {label: 'Chevauchement de niveau d\'étude', value: 'Retry level'},
        {label: 'Délivrance d\'un relevé de notes ou d\'une attestation de réussite', value: 'Note Rel'},
    ],
    // BACKEND
    CHECK_USER: BACKEND + 'check-user',
    SERVICE_ACCUEIL_USER: BACKEND + 'service-accueil',
    SERVICE_TRAITANT_USER: BACKEND + 'service-traitant',
    REGISTER_USER: BACKEND + 'etudiants',
    REQUEST_INIT: BACKEND + 'requete',
};

export default Constants;
