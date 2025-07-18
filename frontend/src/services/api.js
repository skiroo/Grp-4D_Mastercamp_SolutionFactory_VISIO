// services/api.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000',
});

// ============= API Connexion =============
export const login = (email, mot_de_passe) =>
    API.post('/login', { email, mot_de_passe });

export const register = (data) =>
    API.post('/register', data);

export function generateAgentKey() {
  const role = localStorage.getItem('role');
  return API.post('/generate-agent-key', {}, {
    headers: { Role: role }
  });
}

export const getAccessKeys = () =>
  API.get('/access-keys', {
    headers: { Role: localStorage.getItem('role') }
  });

export const updateAccessKey = (id, data) =>
  API.put(`/access-keys/${id}`, data, {
    headers: { Role: localStorage.getItem('role') }
  });

export const deleteAccessKey = (id) =>
  API.delete(`/access-keys/${id}`, {
    headers: { Role: localStorage.getItem('role') }
  });


// ============= API Localisation =============
export const getLocalisations = () =>
    API.get('/api/localisations');

export const getTodayLocalisations = () =>
    API.get('/api/localisations/today');

// API Stats
export const getStats = (startOrPeriod, end = null) => {
  if (end) {
    return API.get(`/api/stats?periode=custom&date_min=${startOrPeriod}&date_max=${end}`).then(res => res.data);
  } else {
    return API.get(`/api/stats?periode=${startOrPeriod}`).then(res => res.data);
  }
};

// Api Alertes
export async function getAlerts(periode = 'day', start = null, end = null) {
  let url = `/api/alerts?periode=${periode}`;
  if (periode === 'custom' && start && end) {
    url += `&date_min=${start}&date_max=${end}`;
  }
  return await API.get(url);
}

// ============= API Règles =============

// Récupérer tous les groupes de règles
export const getRuleGroups = () =>
  API.get('/api/rule-groups');

// Ajouter un nouveau groupe de règles
export const addRuleGroup = (data) =>
  API.post('/api/rule-groups', data);

// Modifier un groupe de règles
export const updateRuleGroup = (id, data) =>
  API.put(`/api/rule-groups/${id}`, data);

// Supprimer un groupe de règles
export const deleteRuleGroup = (id) =>
  API.delete(`/api/rule-groups/${id}`);

// Récupérer toutes les règles d'un groupe
export const getRulesByGroup = (groupId) =>
  API.get(`/api/rule-groups/${groupId}/rules`);

// Ajouter une règle à un groupe
export const addRuleToGroup = (groupId, data) =>
  API.post(`/api/rule-groups/${groupId}/rules`, data);

// Modifier une règle
export const updateRule = (ruleId, data) =>
  API.put(`/rules/${ruleId}`, data);

// Supprimer une règle
export const deleteRule = (ruleId) =>
  API.delete(`/rules/${ruleId}`);


export default API;
