import { useState, useRef, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef: any = useRef(null);

    useEffect(() => {
        const handleEscKey = (event: any) => {
            if (event.key === "Escape") {
                inputRef.current.blur();
                setIsFocused(false);
            }
        };

        const handleCtrlK = (event: any) => {
            if (event.ctrlKey && event.key === "k") {
                event.preventDefault(); // Prevents the browser's default behavior
                setIsFocused(true);
                inputRef.current.focus();
            }
        };

        document.addEventListener("keydown", handleEscKey);
        document.addEventListener("keydown", handleCtrlK);

        return () => {
            document.removeEventListener("keydown", handleEscKey);
            document.removeEventListener("keydown", handleCtrlK);
        };
    }, []);

    const handleFocus = () => {
        setIsFocused(true);
        inputRef.current.focus();
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleCancel = () => {
        setIsFocused(false);
        inputRef.current.value = "";
        inputRef.current.blur();
    };

    const handleKeyPress = (event: any) => {
        if (event.key === "Enter") {
            // Perform the search operation here, e.g., using an API call
            console.log("Searching for:", inputRef.current.value);
        }
    };

    return (
        <div
            style={{
                position: "relative",
                display: "inline-block",
                width: isFocused ? "330px" : "300px",
                height: "48px",
                backgroundColor: isFocused ? "#fff" : "#f7f7f7",
                borderRadius: "10px",
                boxShadow: isFocused
                    ? "0px 4px 16px rgba(0, 0, 0, 0.1)"
                    : "0px 2px 10px rgba(0, 0, 0, 0.05)",
                transition: "all 0.3s ease",
                fontFamily: "Helvetica Neue, sans-serif",
            }}
        >
            <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                className="form-control"
                style={{
                    borderRadius: "10px",
                    border: "none",
                    paddingLeft: "48px",
                    backgroundColor: "transparent",
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#333",
                    height: "48px",
                    width: "100%",
                    outline: "none",
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
            />
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "16px",
                    transform: "translateY(-50%)",
                    fontSize: "20px",
                    color: isFocused ? "#007bff" : "#aaa",
                    transition: "all 0.3s ease",
                }}
            >
                <SearchIcon fontSize="large" />
            </div>
            {isFocused && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        right: "16px",
                        transform: "translateY(-50%)",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#007bff",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                    }}
                    onClick={handleCancel}
                >
                    Cancel
                </div>
            )}
            {isFocused && (
                <div
                    style={{
                        position: "absolute",
                        bottom: "-8px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "90%",
                        height: "2px",
                        backgroundColor: "#007bff",
                        borderRadius: "2px",
                        transition: "all 0.3s ease",
                    }}
                />
            )}
            {!isFocused && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        right: "16px",
                        transform: "translateY(-50%)",
                        fontSize: "14px",
                        transition: "all 0.3s ease",
                    }}
                >
                    <div
                        style={{
                            border: "1px solid #aaa",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            display: "inline-block",
                        }}
                    >
                        CTRL + K
                    </div>
                </div>
            )}


        </div>
    );
};

export default SearchBar;
