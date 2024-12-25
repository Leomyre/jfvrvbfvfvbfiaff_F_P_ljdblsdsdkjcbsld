import UrlConfig from '@/util/config';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [contact, setContact] = useState({});

    useEffect(() => {
        // Fetch Projects
        fetch(`${UrlConfig.apiBaseUrl}/api/projects/`)
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error('Error fetching projects:', error));

        // Fetch Skills
        fetch(`${UrlConfig.apiBaseUrl}/api/skills/`)
            .then(response => response.json())
            .then(data => setSkills(data))
            .catch(error => console.error('Error fetching skills:', error));

        // Fetch Contact
        fetch(`${UrlConfig.apiBaseUrl}/api/contacts/`)
            .then(response => response.json())
            .then(data => setContact(data[0]))
            .catch(error => console.error('Error fetching contact:', error));
    }, []);

    return (
        <div>
            <h1>Portfolio</h1>
            <section>
                <h2>Projects</h2>
                <ul>
                    {projects.map(project => (
                        <li key={project.id}>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            {/* Use next/link for internal navigation */}
                            <Link href='#' target="_blank" rel="noopener noreferrer">
                                View Project
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
            <section>
                <h2>Skills</h2>
                <ul>
                    {skills.map(skill => (
                        <li key={skill.id}>
                            {skill.name}: {skill.level}%
                        </li>
                    ))}
                </ul>
            </section>
            <section>
                <h2>Contact</h2>
                {contact ? (
                    <>
                        <p>Email: {contact.email}</p>
                        <p>Phone: {contact.phone}</p>
                        <p>
                            <Link href='https://github.com/Leomyre/' target="_blank" rel="noopener noreferrer">
                                GitHub
                            </Link>
                        </p>
                    </>
                ) : (
                    <p>Contact information is not available.</p>
                )}
            </section>
            {/* Example of using Link component for internal navigation */}
            <Link href="/admin/Admin">
                <p>Go to Admin Page</p>
            </Link>
        </div>
    );
};

export default Home;
