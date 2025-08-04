// components/TagInput.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, XIcon } from "lucide-react";
import { searchTags, createTag } from "@/app/actions/tagActions"; // Your server actions
import { useDebounce } from "use-debounce"; // Install: npm install use-debounce

interface Tag {
  _id: string;
  name: string;
}

interface TagInputProps {
  onTagsChange: (tags: Tag[]) => void;
  initialTags?: Tag[];
}

export function TagInput({ onTagsChange, initialTags = [] }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(initialTags);
  const [debouncedInputValue] = useDebounce(inputValue, 300);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Notify parent component about tag changes
    onTagsChange(selectedTags);
  }, [selectedTags, onTagsChange]);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }
    const fetchedTags = await searchTags(query);
    setSuggestions(fetchedTags);
  }, []);

  useEffect(() => {
    if (debouncedInputValue) {
      fetchSuggestions(debouncedInputValue);
      setPopoverOpen(true);
    } else {
      setSuggestions([]);
      setPopoverOpen(false);
    }
  }, [debouncedInputValue, fetchSuggestions]);

  const handleSelectTag = (tag: Tag) => {
    if (!selectedTags.some((t) => t._id === tag._id)) {
      setSelectedTags((prev) => [...prev, tag]);
    }
    setInputValue("");
    setSuggestions([]);
    setPopoverOpen(false);
  };

  const handleRemoveTag = (tagId: string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag._id !== tagId));
  };

  const handleCreateNewTag = async () => {
    if (inputValue.trim() === "") return;

    try {
      const newTag = await createTag(inputValue.trim());
      if (newTag && !selectedTags.some((t) => t._id === newTag._id)) {
        setSelectedTags((prev) => [...prev, newTag]);
      }
      setInputValue("");
      setSuggestions([]);
      setPopoverOpen(false);
    } catch (error) {
      console.error("Failed to add new tag:", error);
      // Optionally show a toast notification here
    }
  };

  const currentTagExistsInSuggestions = suggestions.some(
    (s) => s.name.toLowerCase() === inputValue.toLowerCase()
  );

  return (
    <div>
      <Popover
        open={
          popoverOpen && (suggestions.length > 0 || inputValue.trim() !== "")
        }
        onOpenChange={setPopoverOpen}
      >
        <PopoverTrigger asChild>
          <Input
            ref={inputRef}
            placeholder="Search or add tags..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => {
              if (inputValue && suggestions.length > 0) setPopoverOpen(true);
            }}
            onBlur={() => {
              // Delay closing to allow click on suggestions
              setTimeout(() => setPopoverOpen(false), 100);
            }}
          />
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <div className="max-h-60 overflow-y-auto">
            {suggestions.length > 0
              ? suggestions.map((tag) => (
                  <Button
                    key={tag._id}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleSelectTag(tag)}
                    onMouseDown={(e) => e.preventDefault()} // Prevent blur from closing popover
                  >
                    {tag.name}
                  </Button>
                ))
              : inputValue.trim() !== "" &&
                !currentTagExistsInSuggestions && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left"
                    onClick={handleCreateNewTag}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <PlusIcon className="mr-2 h-4 w-4" /> Add "{inputValue}"
                  </Button>
                )}
            {suggestions.length === 0 && inputValue.trim() === "" && (
              <p className="p-2 text-sm text-gray-500">
                Start typing to search tags...
              </p>
            )}
          </div>
        </PopoverContent>
      </Popover>

      <div className="mt-2 flex flex-wrap gap-2">
        {selectedTags.map((tag) => (
          <Badge key={tag._id} variant="secondary" className="pr-1">
            {tag.name}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-auto p-1 ml-1 rounded-full hover:bg-muted"
              onClick={() => handleRemoveTag(tag._id)}
            >
              <XIcon className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
