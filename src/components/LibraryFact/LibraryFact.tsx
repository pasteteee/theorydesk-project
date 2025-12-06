import React, { useState } from "react";
import { Plus } from "lucide-react";
import styles from "./LibraryFact.module.scss";

interface TLibraryFactProps {
  onAdd: (content: string) => void;
}

export default function LibraryFact({ onAdd }: TLibraryFactProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onAdd(content);
      setContent("");
    }
  };

  return (
    <div className={styles.library}>
      <h3>Add New Fact</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter a new fact or theory..."
          className={styles.input}
          rows={3}
        />
        <button type="submit" className={styles.addButton}>
          <Plus size={18} />
          Add to Board
        </button>
      </form>
    </div>
  );
}
