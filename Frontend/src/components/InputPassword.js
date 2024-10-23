import { useState } from "react";
import { Input, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const InputPassword = ({
  name,
  type = "password",
  placeholder,
  state,
  setPassword,
}) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <InputGroup size="md" mb="15px">
      <Input
        name={name}
        type={showPass ? "text" : type}
        placeholder={placeholder}
        value={state}
        onChange={(e) => setPassword(e.target.value)}
        pr="4.5rem"
        focusBorderColor="purple.500"
        isRequired
        variant="outline"
        h="50px"
        size="md"
        borderColor="gray.300"
      />
      <InputRightElement width="4.5rem" pt="8px">
        <IconButton
          h="1.75rem"
          size="sm"
          onClick={() => setShowPass(!showPass)}
          icon={showPass ? <ViewOffIcon boxSize={5}/> : <ViewIcon boxSize={5}/>}
          aria-label="Toggle Password Visibility"
          variant="ghost"
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default InputPassword;
