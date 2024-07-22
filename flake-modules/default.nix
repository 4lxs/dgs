{pkgs, ...}: {
  imports = [
    ./devshell.nix
    ./pre-commit.nix
  ];

  flake = {
    formatter = pkgs.alejandra;
  };
}
