"use client"

import { useState, ChangeEvent, useEffect } from "react";
import { Input } from "../../../../../components/ui/input";

const maxTags = 5

interface TagInputProps {
  onChange: (tags: string[]) => void
  defaultValue?: string | undefined
}

export const TagInput = ({ onChange, defaultValue }: TagInputProps) => {
  const cleanedValues = defaultValue !== undefined ? JSON.parse(defaultValue) : []

  const [tags, setTags] = useState<string[]>(cleanedValues);

  const handleAddTag = (newTag: string) => {
    if (newTag && !tags.includes(newTag) && tags.length < maxTags) {
      const updatedTags = [...tags, newTag]
      setTags(updatedTags)
      onChange(updatedTags)
    }
  };

  const handleRemoveTag = (tag: string) => {
    const updatedTags = tags.filter((t) => t !== tag)
    setTags(updatedTags)
    onChange(updatedTags)
  }

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
        className="w-full rounded-md px-4 py-2"
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
            text-sm shadow-sm bg-border "
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