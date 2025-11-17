import React, { useEffect } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { useThemeColors } from "@/hooks";
import { SelectInput, Button } from "@/components";
import { useImportContext } from "../context/ImportContext";

const ImportStep4: React.FC = () => {
  const { pantone, grey, black, white } = useThemeColors();
  const {
    fieldMapping,
    setFieldMapping,
    handleSaveMapping,
    setAvailableHeaders,
  } = useImportContext();

  // Mock CSV headers - in real implementation, parse from uploaded file
  useEffect(() => {
    setAvailableHeaders([
      "Full Name",
      "Company Name",
      "Job Title",
      "Email Address",
      "Phone",
      "LinkedIn URL",
      "Additional Notes",
      "First Name",
      "Last Name",
      "Mobile Number",
    ]);
  }, [setAvailableHeaders]);

  const handleFieldChange = (
    field: keyof typeof fieldMapping,
    value: string
  ) => {
    setFieldMapping({
      ...fieldMapping,
      [field]: value,
    });
  };

  const mockHeaders = [
    "Full Name",
    "Company Name",
    "Job Title",
    "Email Address",
    "Phone",
    "LinkedIn URL",
    "Additional Notes",
    "First Name",
    "Last Name",
    "Mobile Number",
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "510px",
      }}
    >
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography variant="bodyRegular" sx={{ mb: 1, color: grey.light }}>
          Help the{" "}
          <Typography
            variant="bodyRegular"
            component={"span"}
            sx={{ color: pantone.main }}
          >
            Universe
          </Typography>{" "}
          recognize your contacts
        </Typography>
        <br />
        <Typography variant="bodyRegular" sx={{ color: grey.light }}>
          Map the appropriate headers below.
        </Typography>
      </Box>
      <Box
        sx={{
          border: "1px solid",
          borderColor: black.light,
          borderRadius: "10px",
          padding: "50px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <SelectInput
          label="Name"
          value={fieldMapping.name}
          options={mockHeaders}
          onChange={(value) => handleFieldChange("name", value)}
          placeholder="Choose an option"
        />
        <Divider />
        <SelectInput
          label="Organization"
          value={fieldMapping.organization}
          options={mockHeaders}
          onChange={(value) => handleFieldChange("organization", value)}
          placeholder="Choose an option"
        />{" "}
        <Divider />
        <SelectInput
          label="Designation"
          value={fieldMapping.designation}
          options={mockHeaders}
          onChange={(value) => handleFieldChange("designation", value)}
          placeholder="Choose an option"
        />{" "}
        <Divider />
        <SelectInput
          label="Email"
          value={fieldMapping.email}
          options={mockHeaders}
          onChange={(value) => handleFieldChange("email", value)}
          placeholder="Choose an option"
        />{" "}
        <Divider />
        <SelectInput
          label="Phone Number"
          value={fieldMapping.phoneNumber}
          options={mockHeaders}
          onChange={(value) => handleFieldChange("phoneNumber", value)}
          placeholder="Choose an option"
        />{" "}
        <Divider />
        <SelectInput
          label="Linkedin Handle"
          value={fieldMapping.linkedinHandle}
          options={mockHeaders}
          onChange={(value) => handleFieldChange("linkedinHandle", value)}
          placeholder="Choose an option"
        />{" "}
        <Divider />
        <SelectInput
          label="Notes"
          value={fieldMapping.notes}
          options={mockHeaders}
          onChange={(value) => handleFieldChange("notes", value)}
          placeholder="Choose an option"
        />{" "}
      </Box>{" "}
      <Box sx={{ mt: 2.5 }}>
        <Button onClick={handleSaveMapping} fullWidth>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default ImportStep4;
