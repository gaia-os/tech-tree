'use client';

import { useGraphContext } from '@/app/GraphContext';
import { copyNodeToClipboard, createIdFromTitle } from '@/lib/data';
import { toastSuccess } from '@/lib/toast';
import { LABEL_COLORS, NODE_LABELS, NodeLabel, UiNode } from '@/lib/types';
import React, { useEffect, useState } from 'react';
import { Manual } from './Manual';

const NodeDetails = () => {
  const { selectedNode, setNodes, setSelectedNode, isEditable } =
    useGraphContext();

  const [name, setName] = useState(''); // neo4j's name = reactflow's label
  const [label, setLabel] = useState<NodeLabel>('New');
  const [newDescription, setNewDescription] = useState('');
  const [oldDescription, setOldDescription] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setName(selectedNode.data.label);
      setNewDescription(selectedNode.data.description);
      setOldDescription(selectedNode.data.description);
      setLabel(selectedNode.data.nodeLabel);
    }
  }, [selectedNode]);

  const onLabelChange = (e: React.ChangeEvent<HTMLSelectElement>): void =>
    setLabel(e.target.value as NodeLabel);
  const onNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void =>
    setName(e.target.value);

  const onDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => setNewDescription(e.target.value);

  const updateNodeData = () => {
    const updatedNode: UiNode = {
      ...selectedNode!,
      id: getNodeId(),
      data: { label: name, description: newDescription, nodeLabel: label },
    };

    setSelectedNode(() => updatedNode);

    setNodes((prevNodes) => [
      ...prevNodes.map((n) => (n.id === selectedNode!.id ? updatedNode : n)),
    ]);
    copyNodeToClipboard(updatedNode);
    toastSuccess('Node updated and copied to clipboard!');
  };

  const getNodeId = (): string => {
    // TODO reactivate
    // if (selectedNode!.id === NEW_NODE_ID && name !== NEW_NODE_NAME) {
    return createIdFromTitle(name);
    /*     }

    return selectedNode!.id; */
  };

  if (!selectedNode) return <Manual />;

  return (
    <div className="p-4 mb flex flex-col h-full shadow-md">
      {!selectedNode && <Manual />}

      {selectedNode && (
        <>
          <div className="flex justify-between items-end border-b border-gray-300 pb-2 gap-4">
            {isEditable ? (
              <h3 className="text-lg font-bold">Edit Node</h3>
            ) : (
              <h3 className="text-lg font-bold">{name}</h3>
            )}

            {isEditable && (
              <div className="relative flex items-center">
                <button
                  onClick={() => {
                    copyNodeToClipboard(selectedNode);
                    toastSuccess('Node copied to clipboard!');
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 active:scale-95"
                >
                  <span>Copy code to clipboard</span>
                </button>
              </div>
            )}

            {!isEditable && (
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold rounded bg-${LABEL_COLORS[label]}`}
              >
                {label}
              </span>
            )}
          </div>

          {isEditable && (
            <div className="flex flex-col">
              <div className="mb-4">
                <label className="font-semibold">Type</label>
                <select
                  value={label}
                  onChange={onLabelChange}
                  className="border p-2 w-full mt-2"
                >
                  {NODE_LABELS.map((label) => (
                    <option key={label} value={label}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="font-semibold">Name</label>
                <textarea
                  value={name}
                  onChange={onNameChange}
                  className="border p-2 w-full mt-2"
                  placeholder="Node Name"
                  rows={3}
                />
              </div>

              <div>
                <label className="font-semibold">Description</label>
                <textarea
                  value={newDescription}
                  onChange={onDescriptionChange}
                  className="border p-2 w-full mt-2"
                  placeholder="Node Description"
                  rows={10}
                />
              </div>

              <button
                disabled={!name}
                onClick={updateNodeData}
                className="mt-2 p-2 bg-blue-500 text-white rounded w-full disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center"
              >
                Save (Only temporarily)
              </button>
            </div>
          )}
          {!isEditable && oldDescription && (
            <div className="overflow-auto flex-grow">
              <p className="p-2 w-full mt-2">{oldDescription}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NodeDetails;
