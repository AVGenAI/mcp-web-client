"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMCPStore } from '@/store/mcpStore';
import { ServerFormData } from '@/types/mcp';
import styles from './add-server.module.css';

export default function AddServerPage() {
  const router = useRouter();
  const { addServer } = useMCPStore();
  
  const [formData, setFormData] = useState<ServerFormData>({
    name: '',
    url: '',
    description: '',
  });
  
  const [errors, setErrors] = useState<Partial<ServerFormData>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof ServerFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Partial<ServerFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Server name is required';
    }
    
    if (!formData.url.trim()) {
      newErrors.url = 'Server URL is required';
    } else if (!isValidUrl(formData.url)) {
      newErrors.url = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Add the server
      addServer(formData);
      
      // Redirect to servers page
      router.push('/servers');
    }
  };
  
  return (
    <div className={styles.addServerPage}>
      <header className={styles.header}>
        <h1>Add MCP Server</h1>
        <p>Connect to a new Multimodal Conversational Protocol server</p>
      </header>
      
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              Server Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`${styles.formControl} ${errors.name ? styles.hasError : ''}`}
              value={formData.name}
              onChange={handleChange}
              placeholder="My MCP Server"
            />
            {errors.name && <div className={styles.errorMessage}>{errors.name}</div>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="url" className={styles.formLabel}>
              Server URL
            </label>
            <input
              type="text"
              id="url"
              name="url"
              className={`${styles.formControl} ${errors.url ? styles.hasError : ''}`}
              value={formData.url}
              onChange={handleChange}
              placeholder="https://your-mcp-server.com"
            />
            {errors.url && <div className={styles.errorMessage}>{errors.url}</div>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.formLabel}>
              Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              className={styles.formControl}
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of this server"
              rows={3}
            />
          </div>
          
          <div className={styles.formActions}>
            <Link href="/servers" className={styles.cancelButton}>
              Cancel
            </Link>
            <button type="submit" className={styles.submitButton}>
              Add Server
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}