"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import styles from "./Search.module.scss";
import { useBoardStore } from "@/hooks/useBoardStore";

export default function Search() {
  const { board } = useBoardStore();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const facts = useMemo(() => {
    if (!board) return [];
    return [...board.columns.pro.facts, ...board.columns.con.facts];
  }, [board]);

  const results = useMemo(() => {
    if (query.trim() === "") return [];
    return facts.filter((fact) =>
      fact.content.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, facts]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      )
        setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (id: string) => {
    window.dispatchEvent(new CustomEvent("highlight-fact", { detail: { id } }));
    setIsOpen(false);
    setQuery("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleFocus = () => {
    if (query.trim() !== "") setIsOpen(true);
  };

  return (
    <div className={styles.searchWrapper} ref={wrapperRef}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleChange}
        onFocus={handleFocus}
      />
      {isOpen && results.length > 0 && (
        <div className={styles.searchResults}>
          {results.map((fact) => (
            <div
              key={fact.id}
              className={styles.resultItem}
              onClick={() => handleSelect(fact.id)}
            >
              {fact.content}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
