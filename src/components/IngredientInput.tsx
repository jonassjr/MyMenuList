"use client"

import { useState, ChangeEvent } from "react";
import { Input } from "./ui/input";


export const IngredientInput = () => {

  const [Ingredients, setIngredients] = useState<string[]>([]);

  const handleAddTag = (newTag: string) => {
    if (newTag && !Ingredients.includes(newTag)) {
      setIngredients([...Ingredients, newTag]);
    }
  };

  const handleRemoveTag = (tag: string) =>
    setIngredients(Ingredients.filter((t) => t !== tag));

  const [userInput, setUserInput] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()

      if (
        userInput.trim() !== "" &&
        userInput.length <= 12
      ) {
        handleAddTag(userInput);
        setUserInput("")
      }
    }
  };

  return (
    <div className="flex flex-col w-full">

      <Input
        name="Ingredients"
        type="text"
        placeholder="Adicione ingredientes"
        className="w-full rounded-md px-4 py-2"
        onKeyDown={handleKeyPress}
        onChange={handleInputChange}
        value={userInput}
      />

      {/* ===== Render the Ingredients here ===== */}

      <div className="flex flex-row flex-wrap gap-2 mt-4">
        {Ingredients.map((tag: string, index: number) => (
          <span
            key={`${index}-${tag}`}
            className="inline-flex items-start justify-start px-3 py-2 rounded-[32px] 
            text-sm shadow-sm bg-border"
          >
            {tag}
            <button
              className="ml-2 hover:text-sky-500 "
              onClick={() => handleRemoveTag(tag)}
              title={`Remove ${tag}`}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}