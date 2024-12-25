'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import UrlConfig from '@/util/config';

const Admin = () => {
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [contact, setContact] = useState({});
    const [newProject, setNewProject] = useState({ title: '', description: '', link: '' });
    const [newSkill, setNewSkill] = useState({ name: '', level: '' });
    const [newContact, setNewContact] = useState({ email: '', phone: '', github: '', linkedin: '' });
    const [activeTab, setActiveTab] = useState('projects');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [projectsRes, skillsRes, contactsRes] = await Promise.all([
                fetch(`${UrlConfig.apiBaseUrl}/api/projects/`),
                fetch(`${UrlConfig.apiBaseUrl}/api/skills/`),
                fetch(`${UrlConfig.apiBaseUrl}/api/contacts/`)
            ]);

            const projectsData = await projectsRes.json();
            const skillsData = await skillsRes.json();
            const contactsData = await contactsRes.json();

            setProjects(projectsData);
            setSkills(skillsData);
            setContact(contactsData[0] || {});
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${UrlConfig.apiBaseUrl}/api/projects/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProject),
            });
            const data = await response.json();
            setProjects([...projects, data]);
            setNewProject({ title: '', description: '', link: '' });
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    const handleAddSkill = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${UrlConfig.apiBaseUrl}/api/skills/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSkill),
            });
            const data = await response.json();
            setSkills([...skills, data]);
            setNewSkill({ name: '', level: '' });
        } catch (error) {
            console.error('Error adding skill:', error);
        }
    };

    const handleUpdateContact = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${UrlConfig.apiBaseUrl}/api/contacts/1`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newContact),
            });
            const data = await response.json();
            setContact(data);
            alert('Contact info updated successfully!');
        } catch (error) {
            console.error('Error updating contact info:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                    <Link href="/" className="text-white hover:text-gray-200 transition duration-300">
                        Go to Home
                    </Link>
                </div>
            </nav>

            <div className="container mx-auto mt-8 p-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="flex border-b">
                        {['projects', 'skills', 'contact'].map((tab) => (
                            <button
                                key={tab}
                                className={`flex-1 py-4 px-6 text-center font-medium ${
                                    activeTab === tab
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                } transition duration-300`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="p-6">
                        {activeTab === 'projects' && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Projects</h2>
                                <ul className="space-y-4">
                                    {projects.map((project) => (
                                        <li key={project.id} className="bg-gray-50 p-4 rounded-lg shadow">
                                            <h3 className="text-xl font-medium">{project.title}</h3>
                                            <p className="text-gray-600 mt-2">{project.description}</p>
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-indigo-600 hover:text-indigo-800 mt-2 inline-block"
                                            >
                                                View Project
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                <form onSubmit={handleAddProject} className="mt-8 space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        value={newProject.title}
                                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                    <textarea
                                        placeholder="Description"
                                        value={newProject.description}
                                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                    <input
                                        type="url"
                                        placeholder="Project Link"
                                        value={newProject.link}
                                        onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"
                                    >
                                        Add Project
                                    </button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'skills' && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Skills</h2>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {skills.map((skill) => (
                                        <li key={skill.id} className="bg-gray-50 p-4 rounded-lg shadow">
                                            <h3 className="text-lg font-medium">{skill.name}</h3>
                                            <div className="mt-2 bg-gray-200 rounded-full">
                                                <div
                                                    className="bg-indigo-600 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
                                                    style={{ width: `${skill.level}%` }}
                                                >
                                                    {skill.level}%
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <form onSubmit={handleAddSkill} className="mt-8 space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Skill Name"
                                        value={newSkill.name}
                                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Skill Level"
                                        value={newSkill.level}
                                        onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"
                                    >
                                        Add Skill
                                    </button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'contact' && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Contact Info</h2>
                                {contact ? (
                                    <div className="bg-gray-50 p-4 rounded-lg shadow mb-8">
                                        <p><strong>Email:</strong> {contact.email}</p>
                                        <p><strong>Phone:</strong> {contact.phone}</p>
                                        <p>
                                            <strong>GitHub:</strong>{' '}
                                            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
                                                {contact.github}
                                            </a>
                                        </p>
                                        <p>
                                            <strong>LinkedIn:</strong>{' '}
                                            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
                                                {contact.linkedin}
                                            </a>
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-gray-600">Contact information is not available.</p>
                                )}

                                <form onSubmit={handleUpdateContact} className="space-y-4">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={newContact.email}
                                        onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone"
                                        value={newContact.phone}
                                        onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                    <input
                                        type="url"
                                        placeholder="GitHub URL"
                                        value={newContact.github}
                                        onChange={(e) => setNewContact({ ...newContact, github: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                    <input
                                        type="url"
                                        placeholder="LinkedIn URL"
                                        value={newContact.linkedin}
                                        onChange={(e) => setNewContact({ ...newContact, linkedin: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"
                                    >
                                        Update Contact
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;

