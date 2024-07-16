"use client"

import { useState, ChangeEvent } from "react";
import { Input } from "./ui/input";

const maxTags = 5

export const TagInput = () => {

  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = (newTag: string) => {
    if (newTag && !tags.includes(newTag) && tags.length < maxTags) {
      setTags([...tags, newTag]);
    }
  };

  const handleRemoveTag = (tag: string) =>
    setTags(tags.filter((t) => t !== tag));

  const [userInput, setUserInput] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()

      if (
        userInput.trim() !== "" &&
        userInput.length <= 12 &&
        tags.length < maxTags
      ) {
        handleAddTag(userInput);
        setUserInput("")
      }
    }
  };

  return (
    <div className="flex flex-col w-full">

      <Input
        name="tags"
        type="text"
        placeholder={
          tags.length < maxTags
            ? "Adicone uma tag"
            : `Você só pode adicionar ${maxTags} tags`
        }
        className="w-full bg-zinc-800 placeholder:text-zinc-400 border 
        ring-offset-zinc-800 focus-visible:ring-zinc-300 border-gray-300 rounded-md px-4 py-2"
        onKeyDown={handleKeyPress}
        onChange={handleInputChange}
        value={userInput}
        disabled={tags.length === maxTags}
      />

      {/* ===== Render the tags here ===== */}

      <div className="flex flex-row flex-wrap gap-2 mt-4">
        {tags.map((tag: string, index: number) => (
          <span
            key={`${index}-${tag}`}
            className="inline-flex items-start justify-start px-3 py-2 rounded-[32px] 
            text-sm shadow-sm bg-zinc-800 border text-zinc-200 "
          >
            {tag}
            <button
              className="ml-2 hover:text-sky-600"
              onClick={() => handleRemoveTag(tag)}
              title={`Remover ${tag}`}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}