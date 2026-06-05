import sharp from "sharp";
import { getAgentById, setAgentAvatar } from "@/lib/server/agents";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
const MAX_AVATAR_SIZE_BYTES = 2 * 1024 * 1024;

export class AgentAvatarError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = "AgentAvatarError";
    this.statusCode = statusCode;
  }
}

export const validateAgentAvatarFile = (file: File) => {
  if (!(file instanceof File) || file.size === 0) {
    throw new AgentAvatarError("Please choose an image file.");
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number])) {
    throw new AgentAvatarError("Invalid image file. Use JPG, PNG, or WebP.");
  }

  if (file.size > MAX_AVATAR_SIZE_BYTES) {
    throw new AgentAvatarError("Image is too large. Maximum size is 2MB.");
  }
};

export const saveAgentAvatarFile = async (agentId: string, file: File) => {
  validateAgentAvatarFile(file);

  const agent = await getAgentById(agentId);
  if (!agent) {
    throw new AgentAvatarError("Agent not found.", 404);
  }

  const inputBuffer = Buffer.from(await file.arrayBuffer());
  const outputBuffer = await sharp(inputBuffer)
    .rotate()
    .resize(320, 320, { fit: "cover" })
    .webp({ quality: 82 })
    .toBuffer();

  const avatarUrl = `data:image/webp;base64,${outputBuffer.toString("base64")}`;
  const updatedAgent = await setAgentAvatar(agentId, avatarUrl);

  if (!updatedAgent) {
    throw new AgentAvatarError("Agent not found.", 404);
  }

  return {
    agent: updatedAgent,
    avatarUrl,
  };
};
