import { useEffect, useState } from "react";

const GoogleTranslateDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    // addScript.async = true;
    document.body.appendChild(addScript);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,fr,ta,hi,te,ma",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    return () => {
        document.body.removeChild(addScript); // Cleanup script on unmount
      };
  }, []);

  return (
    <div className="inline-block">
    <div
      id="google_translate_element"
      className=" bg-white shadow-md w-48"
    ></div>
  </div>
  );
};

export default GoogleTranslateDropdown;
