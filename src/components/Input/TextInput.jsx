// TextInput.jsx
// Reusable input component that renders either a text input or textarea
// based on the 'textarea' prop. Supports dark/light mode theming.

const TextInput = ({ isDarkMode, value, handleInputChange, textarea, label }) => {

    // Dynamically switch between 'input' and 'textarea' HTML elements
    const InputComponent = textarea ? "textarea" : "input";

    return (
        <div className="relative">

            {/* 
                Spread props conditionally:
                - textarea gets 'rows' for height
                - input gets 'type' for validation
                resize-none prevents manual resizing of textarea
            */}
            <InputComponent
                {...(textarea ? { rows: 5 } : { type: "text" })}
                className={`w-full px-4 pt-6 pb-2 border rounded-xl transition-all duration-300 outline-none resize-none ${isDarkMode
                        ? "bg-gray-800/50 border-gray-700 text-white focus:border-blue-500 focus:bg-gray-800/70"
                        : "bg-white/80 border-gray-300 text-gray-900 focus:border-blue-500 focus:bg-white"
                    }`}
                value={value}
                // Destructure target from event object for cleaner syntax
                onChange={({ target }) => handleInputChange(target.value)}
            />

            {/* 
                Floating label positioned absolutely above the input text
                pointer-events-none prevents it from blocking input clicks
            */}
            <label className={`text-sm absolute left-4 top-2 pointer-events-none origin-left ${isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}>
                {label}
            </label>
        </div>
    );
};

export default TextInput;