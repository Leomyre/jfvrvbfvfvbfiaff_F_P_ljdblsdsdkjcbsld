'use client'

import { useState, useEffect } from 'react'
import UrlConfig from '../../util/config';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${UrlConfig.apiBaseUrl}/api/skills/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch skills data');
        }
        return response.json();
      })
      .then(data => {
        setSkills(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching skills:', error);
        setError('Impossible de charger les compétences.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-blue-200">Chargement des compétences...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="bg-blue-900 bg-opacity-50 p-8 rounded-lg backdrop-filter backdrop-blur-lg shadow-xl">
      <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-600">Mes Compétences</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map(skill => (
          <div key={skill.id} className="bg-blue-800 bg-opacity-50 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-3 text-blue-300">{skill.name}</h3>
            <div className="w-full bg-blue-700 rounded-full h-2.5 mb-4">
              <div
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-2.5 rounded-full"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
            <p className="text-blue-200">Niveau: {skill.level}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

