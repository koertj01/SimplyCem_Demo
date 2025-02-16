import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import Map from "./Map";
import MappingTools from "./MappingTools";

const MappingPage: React.FC = () => {
  const [sections, setSections] = useState<string[]>([]);
  const [blocks, setBlocks] = useState<string[]>([]);
  const [rows, setRows] = useState<string[]>([]);
  const [lots, setLots] = useState<string[]>([]);
  const [graves, setGraves] = useState<string[]>([]);

  async function fetchGraveEntries() {
    const { data, error } = await supabase
      .from("grave_entries")
      .select("section, block, row, lot, grave");

    if (error) {
      console.error("Error fetching grave entries:", error);
      return;
    }

    if (data) {
      setSections([...new Set(data.map((item) => item.section))]);
      setBlocks([...new Set(data.map((item) => item.block))]);
      setRows([...new Set(data.map((item) => item.row))]);
      setLots([...new Set(data.map((item) => item.lot))]);
      setGraves([...new Set(data.map((item) => item.grave))]);
    }
  }

  useEffect(() => {
    fetchGraveEntries();
  }, []);

  return (
    <div>
      <MappingTools sections={sections} blocks={blocks} rows={rows} lots={lots} graves={graves} />
      <Map />
    </div>
  );
};

export default MappingPage;
