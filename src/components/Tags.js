import Tagify from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css";
import React, { useEffect, useRef } from "react";

const Tags = ({ nicheOptions, selectedNiches, onAddNiche, onRemoveNiche }) => {
  const tagInputRef = useRef();

  useEffect(() => {
    const tagify = new Tagify(tagInputRef.current, {
      whitelist: nicheOptions.map((option) => option.label),
      maxTags: 3,
      dropdown: {
        classname: "tags-look",
        enabled: 0
      },
    });

    // Add event listeners for adding/removing niches
    tagify.on("add", (e) => {
      onAddNiche(e.detail.data.value);
    });

    tagify.on("remove", (e) => {
      onRemoveNiche(e.detail.data.value);
    });

    // Set initial tags
    tagify.addTags(selectedNiches);

    return () => {
      tagify.destroy();
    };
  }, [nicheOptions, selectedNiches]);

  return (
    <div>
      <input
        id="tags"
        name="tags"
        placeholder="Type and press Enter"
        ref={tagInputRef}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default Tags;
